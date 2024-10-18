import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const product = await prisma.product.findUnique({
      where: { code },
    });
    return NextResponse.json(product);
  }

  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const { code, name, price } = await request.json();
  
  const product = await prisma.product.create({
    data: { code, name, price },
  });
  return NextResponse.json(product, { status: 201 });
}

export async function PUT(request: Request) {
  const { id, name, price } = await request.json();
  
  const product = await prisma.product.update({
    where: { id },
    data: { name, price },
  });
  return NextResponse.json(product);
}
