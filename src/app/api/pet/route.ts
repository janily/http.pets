import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return new Response(
    JSON.stringify({ 
      message: 'GET request received', 
      method: 'GET',
      status: 'success',
      data: { 
        id: 1,
        name: 'Happy Pet',
        type: 'GET-animal',
        mood: 'joyful'
      }
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  return new Response(
    JSON.stringify({ 
      message: 'POST request received', 
      method: 'POST',
      status: 'created',
      data: { 
        id: Math.floor(Math.random() * 1000),
        ...body,
        createdAt: new Date().toISOString()
      }
    }),
    {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  
  return new Response(
    JSON.stringify({ 
      message: 'PUT request received', 
      method: 'PUT',
      status: 'updated',
      data: { 
        id: 1,
        ...body,
        updatedAt: new Date().toISOString(),
        replaced: true
      }
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  
  return new Response(
    JSON.stringify({ 
      message: 'PATCH request received', 
      method: 'PATCH',
      status: 'partially updated',
      data: { 
        id: 1,
        changes: body,
        updatedAt: new Date().toISOString()
      }
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

export async function DELETE(request: NextRequest) {
  return new Response(
    JSON.stringify({ 
      message: 'DELETE request received', 
      method: 'DELETE',
      status: 'deleted',
      data: null
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}