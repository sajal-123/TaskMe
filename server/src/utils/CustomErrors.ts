// src/utils/CustomError.ts

export class CustomError extends Error {
    statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
  
      // Setting the prototype manually for class inheritance in TypeScript
      Object.setPrototypeOf(this, CustomError.prototype);
    }
  }
  