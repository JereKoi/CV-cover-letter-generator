import { getFirestore } from "firebase-admin/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { sanitizeInput } from "../../utils/sanitizeInput";
import { formValidationSchema } from "../../utils/validationSchema";

const db = getFirestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // Clean data
      const sanitizedData = Object.fromEntries(
        Object.entries(req.body).map(([key, value]) => [key, sanitizeInput(value)])
      );

      // Validoi data
      const validatedData = await formValidationSchema.validate(sanitizedData, {
        abortEarly: false, // Show all validation errors
      });

      // Tallenna Firestoreen
      await db.collection("forms").add(validatedData);

      return res.status(200).json({ message: "Form submitted successfully" });
    } catch (error: any) {
      if (error.name === "ValidationError") {
        const formattedErrors = error.inner.reduce((acc: any, err: any) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
        return res.status(400).json({ errors: formattedErrors });
      }

      console.error("Error saving data:", error);
      return res.status(500).json({ message: "Failed to save data" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
