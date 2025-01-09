import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MultiStepForm from "./MultiStepForm";

// Mock Axios to avoid making real HTTP requests
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("MultiStepForm", () => {
  test("renders the first step and allows navigation between steps", async () => {
    render(<MultiStepForm />);

    // Check if the first step is rendered initially
    expect(screen.getByText(/Step 1/i)).toBeInTheDocument();

    // Click the "Next" button to go to the next step
    fireEvent.click(screen.getByText(/Next/i));

    // Wait for the second step to appear
    await waitFor(() => expect(screen.getByText(/Step 2/i)).toBeInTheDocument());

    // Click the "Previous" button to go back to the first step
    fireEvent.click(screen.getByText(/Previous/i));
    await waitFor(() => expect(screen.getByText(/Step 1/i)).toBeInTheDocument());
  });

  test("prevents navigation to the next step if validation fails", async () => {
    render(<MultiStepForm />);

    // Attempt to move to the next step without filling required fields
    fireEvent.click(screen.getByText(/Next/i));

    // Wait for the validation error message to appear
    await waitFor(() =>
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument()
    );
  });

  test("submits the form with valid data", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { success: true } });

    render(<MultiStepForm />);

    // Fill in valid data in the first step
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "Doe" },
    });
    fireEvent.click(screen.getByText(/Next/i));

    // Fill in valid data in the second step
    await waitFor(() => screen.getByText(/Step 2/i));
    fireEvent.change(screen.getByLabelText(/Job Title/i), {
      target: { value: "Developer" },
    });
    fireEvent.click(screen.getByText(/Next/i));

    // Submit the form from the third step
    await waitFor(() => screen.getByText(/Step 3/i));
    fireEvent.click(screen.getByText(/Submit/i));

    // Ensure the form is submitted with the correct data
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith("/api/form", {
        firstName: "John",
        lastName: "Doe",
        jobTitle: "Developer",
        // Add other fields as needed
      });
      expect(
        screen.getByText(/Form submitted successfully!/i)
      ).toBeInTheDocument();
    });
  });

  test("handles backend validation errors", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        status: 400,
        data: {
          errors: {
            firstName: ["First name is required."],
          },
        },
      },
    });

    render(<MultiStepForm />);

    // Submit the form with invalid data
    fireEvent.click(screen.getByText(/Submit/i));

    // Wait for the backend validation error to appear in the UI
    await waitFor(() =>
      expect(
        screen.getByText(/First name is required./i)
      ).toBeInTheDocument()
    );
  });
});
