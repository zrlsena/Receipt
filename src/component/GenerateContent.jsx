// require('dotenv').config();

import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';


const GenerateContent = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [generatedText, setGeneratedText] = useState('');
  const [error, setError] = useState(null);

  const API_KEY = "AIzaSyAzUxJlXcVjvBRHdNTKCgKQOXeNBGMT5eo"; // Replace with your actual API key

  const handleImageChange = (event) => {
    const newImages = [...event.target.files];
    setSelectedImages(newImages);
  };

  const handleSubmit = async () => {
    if (!selectedImages.length) {
      setError('Please select at least one image');
      return;
    }

    setError(null); // Clear previous errors, if any

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

      const prompt = 'What\'s different between these pictures?';

      const imageParts = await Promise.all(
        selectedImages.map(async (file) => {
          const base64EncodedData = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(file);
          });
          return {
            inlineData: { data: base64EncodedData, mimeType: file.type },
          };
        })
      );

      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const text = response.text();
      setGeneratedText(text);
    } catch (error) {

      setError(error.message + API_KEY); // Handle potential errors during API call
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" multiple onChange={handleImageChange} />
      <button onClick={handleSubmit}>Analyze Images</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {generatedText && <p>{generatedText}</p>}
    </div>
  );
};

export default GenerateContent;
