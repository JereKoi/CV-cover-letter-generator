import type { NextApiRequest, NextApiResponse } from "next";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  companyName: string;
  schoolName: string;
  degree: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { firstName, lastName, email, jobTitle, companyName, schoolName, degree }: FormData = req.body;

    // Validation
    const errors: Record<string, string[]> = {};

    if (!firstName) errors.firstName = ["First name is required"];
    if (!email || !/\S+@\S+\.\S+/.test(email)) errors.email = ["A valid email is required"];

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    try {
      // Here can perform for example database saving
      // const result = await someDatabaseOperation(formData);

      return res.status(200).json({ message: "Form submitted successfully" });
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong. Please try again later." });
    }
  } else {
    // Other HTTP not allowed
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
