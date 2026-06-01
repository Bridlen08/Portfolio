export const sendContactMessage = async (formData: FormData) => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5003';
  const response = await fetch(`${apiUrl}/api/contact`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let errorMessage = 'Failed to send message';
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch (e) {
      // Ignored
    }
    throw new Error(errorMessage);
  }

  return response.json();
};
