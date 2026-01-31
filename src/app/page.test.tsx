// Simple test file to validate the project structure
// This would normally be in a separate test directory, but adding here for verification

export const HTTPMethods = {
  GET: {
    description: "Retrieves data from the server",
    example: "/api/pet?id=123",
    pet: "🐶 Doggo (happy)"
  },
  POST: {
    description: "Creates new resources on the server", 
    example: "/api/pet",
    pet: "🐱 Kitto (excited)"
  },
  PUT: {
    description: "Updates an entire resource",
    example: "/api/pet/123",
    pet: "🦊 Foxxy (transformed)"
  },
  PATCH: {
    description: "Partially updates a resource",
    example: "/api/pet/123", 
    pet: "🐼 Pando (changed)"
  },
  DELETE: {
    description: "Deletes a resource",
    example: "/api/pet/123",
    pet: "🦥 Slothy (sad)"
  }
};

console.log("HTTP Pets Test Data:", HTTPMethods);