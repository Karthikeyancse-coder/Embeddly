// src/app/api/enroll/route.js
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/rateLimit';

// 1. Strict Server-Side Validation Schema
const enrollmentSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(80, 'Name must not exceed 80 characters')
      // Strip HTML brackets to block script injection
      .transform((val) => val.replace(/[<>]/g, ''))
      .optional(),

    studentName: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(80, 'Name must not exceed 80 characters')
      .transform((val) => val.replace(/[<>]/g, ''))
      .optional(),

    email: z
      .string()
      .trim()
      .email('Please enter a valid email address')
      .max(100, 'Email must not exceed 100 characters')
      .toLowerCase()
      .optional(),

    studentEmail: z
      .string()
      .trim()
      .email('Please enter a valid email address')
      .max(100, 'Email must not exceed 100 characters')
      .toLowerCase()
      .optional(),

    phone: z
      .string()
      .trim()
      .regex(/^[+]?[0-9\s\-()]{7,20}$/, 'Invalid phone number format')
      .optional(),

    studentPhone: z
      .string()
      .trim()
      .regex(/^[+]?[0-9\s\-()]{7,20}$/, 'Invalid phone number format')
      .optional(),

    courseInterest: z
      .string()
      .trim()
      .max(50)
      .optional()
      .default('general'),

    // 2. Honeypot Field (Bot Trap)
    // Real users won't see or fill this. If populated, it is automated spam.
    companyWebsite: z.string().optional().default(''),
  })
  .refine((data) => data.fullName || data.studentName, {
    message: 'Name must be at least 2 characters',
    path: ['fullName'],
  })
  .refine((data) => data.email || data.studentEmail, {
    message: 'Please enter a valid email address',
    path: ['email'],
  })
  .refine((data) => data.phone || data.studentPhone, {
    message: 'Invalid phone number format',
    path: ['phone'],
  });

export async function POST(req) {
  try {
    // --- Step A: Extract Client IP & Check Rate Limit ---
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : (realIp || '127.0.0.1');

    // Cap at 5 submissions per minute per IP
    const { isLimited, remaining, resetTime } = checkRateLimit(clientIp, 5, 60000);

    if (isLimited) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please wait a minute before submitting again.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    // --- Step B: Parse Request Body ---
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Malformed JSON payload.' }, { status: 400 });
    }

    // --- Step C: Validate & Sanitize Input ---
    const parseResult = enrollmentSchema.safeParse(body);

    if (!parseResult.success) {
      // Return the first friendly validation message
      const firstError =
        parseResult.error?.issues?.[0]?.message ||
        parseResult.error?.errors?.[0]?.message ||
        'Invalid input data.';
      return NextResponse.json({ error: firstError }, { status: 422 });
    }

    const cleanData = parseResult.data;

    // Normalize canonical keys
    const finalRecord = {
      fullName: cleanData.fullName || cleanData.studentName,
      email: cleanData.email || cleanData.studentEmail,
      phone: cleanData.phone || cleanData.studentPhone,
      courseInterest: cleanData.courseInterest,
    };

    // Silent honeypot discard: return 200 without saving so bots think they succeeded
    if (body.companyWebsite && body.companyWebsite.length > 0) {
      return NextResponse.json({ success: true, message: 'Enrollment submitted.' }, { status: 200 });
    }

    // --- Step D: Save to Database / Message Queue ---
    // Log in development for auditability
    console.log('[Enrollment API] New valid enrollment:', finalRecord.email, finalRecord.courseInterest);

    return NextResponse.json(
      {
        success: true,
        message: 'Enrollment submitted successfully.',
      },
      {
        status: 201,
        headers: {
          'X-RateLimit-Remaining': remaining.toString(),
        },
      }
    );
  } catch (error) {
    console.error('Enrollment API error:', error);
    return NextResponse.json(
      { error: 'An unexpected server error occurred.' },
      { status: 500 }
    );
  }
}
