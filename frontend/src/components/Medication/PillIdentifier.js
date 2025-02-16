import React, { useState } from 'react';
import { identifyPill } from '../../services/medication';

function PillIdentifier() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!image) {
      setError('Please select an image');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', image);
      const response = await identifyPill(formData);
      setResult(response.data);
    } catch (error) {
      setError('Failed to identify pill. Please try again.');
    }
  };

  return (
    <div className="pill-identifier">
      <h2>Pill Identifier</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">Upload Pill Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit">Identify Pill</button>
      </form>
      {result && (
        <div className="result">
          <h3>Identification Result:</h3>
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>Description:</strong> {result.description}</p>
          <p><strong>Usage:</strong> {result.usage}</p>
        </div>
      )}
    </div>
  );
}

export default PillIdentifier;
