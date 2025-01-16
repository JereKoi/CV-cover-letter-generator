import { NextApiRequest, NextApiResponse } from "next";

const validateFormData = (data: any) => {
  const errors: Record<string, string[]> = {};

  if (!data.firstName || data.firstName.trim() === "") {
    errors.firstName = ["First name is required"];
  }
  if (!data.lastName || data.lastName.trim() === "") {
    errors.lastName = ["Last name is required"];
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = ["Email must be valid"];
  }
  if (!data.jobTitle || data.jobTitle.trim() === "") {
    errors.jobTitle = ["Job title is required"];
  }
  if (!data.companyName || data.companyName.trim() === "") {
    errors.companyName = ["Company name is required"];
  }
  if (!data.schoolName || data.schoolName.trim() === "") {
    errors.schoolName = ["School name is required"];
  }
  if (!data.degree || data.degree.trim() === "") {
    errors.degree = ["Degree is required"];
  }

  return errors;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const errors = validateFormData(req.body);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // Simulate saving the data (e.g., saving to Firebase)
    return res.status(200).json({ message: "Form submitted successfully" });
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
