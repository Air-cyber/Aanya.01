import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaPaperPlane, FaImage, FaTimes } from 'react-icons/fa';
import './home.css';

function Home() {
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('homework');
  const [expandedImage, setExpandedImage] = useState(null);

  const messageEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [responses]);

  const handleFormatChange = (format) => {
    setSelectedFormat(format);
  };

  const getPromptBasedOnFormat = () => {
    if (selectedFormat === 'homework') {
      return `You are an experienced and friendly teacher helping students with their homework.
When I give you a question, provide a helpful answer that guides the student toward understanding, not just giving the answer.
Format your answer like this:
- Start with a friendly greeting
- Use clear section headings in bold (use ** around text you want to appear bold)
- Break the solution down step-by-step, using numbered points
- Include hints and tips rather than complete solutions where appropriate
- Use emojis occasionally to make the content engaging
- End with an encouraging message
Keep your explanation supportive, clear, and educational.
Now answer the following homework question: ${input}`;
    } else {
      return `You are an experienced and friendly teacher explaining concepts to school students.
When I give you a question, break down the answer in a detailed, step-by-step guide.
Format your answer like this:
- Start with a brief introduction to the concept
- Use clear section headings in bold (use ** around text you want to appear bold)
- Number each step clearly (Step 1, Step 2, etc.)
- Include visual descriptions or analogies where possible
- Use emojis occasionally to make the content engaging
- End with a summary of what was learned
Make sure each step is very clear and builds on the previous one.
Now provide a step-by-step guide for: ${input}`;
    }
  };

  const handleSend = async () => {
    if (!input && !image) {
      alert('Please provide text, image, or voice');
      return;
    }

    const formData = new FormData();
    const promptWithInstruction = getPromptBasedOnFormat();
    formData.append('text', promptWithInstruction);
    if (image) formData.append('image', image);

    // Save the current input text and image to display in the user message
    const currentInput = input;
    const currentImagePreview = imagePreview;

    setLoading(true);
    try {
      setResponses(prev => [...prev, {
        type: 'user',
        text: currentInput,
        image: currentImagePreview
      }]);

      const res = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      // Clean up the response by removing any HTML tags but keep the content
      const cleanedResponse = data.response.replace(/<\/?[^>]+(>|$)/g, '');

      setResponses(prev => [...prev, {
        type: 'ai',
        text: cleanedResponse
      }]);
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    } finally {
      setLoading(false);
      setInput('');
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) =>
      setInput(prev => prev + ' ' + event.results[0][0].transcript);
    recognition.onerror = (e) => alert('Voice error: ' + e.error);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Create image preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  // Function to handle image click for enlarging
  const handleImageExpand = (imageSrc) => {
    setExpandedImage(imageSrc);
  };

  // Enhanced renderer to support educational formatting including bold text with **
  const renderMessageText = (text) => {
    if (!text) return null;
    // Split by double newline to create paragraphs
    const paragraphs = text.split('\n\n');
    return paragraphs.map((paragraph, i) => {
      // Process bold text with ** markers
      const processedText = paragraph.replace(/\*\*(.*?)\*\*/g, (match, content) => {
        return `<strong>${content}</strong>`;
      });

      // Check if this is a heading (usually short, contains some indicator words)
      const isHeading = paragraph.trim().length < 70 &&
        (paragraph.includes('Introduction') ||
          paragraph.includes('Summary') ||
          paragraph.includes('Layer') ||
          paragraph.includes('In Summary') ||
          paragraph.includes('Why is') ||
          paragraph.trim().endsWith(':') ||
          paragraph.trim().endsWith('?') ||
          paragraph.includes('**'));

      // Check if this is a list item
      const isBulletPoint = paragraph.trim().startsWith('-') ||
        paragraph.trim().startsWith('*') ||
        /^\d+\./.test(paragraph.trim());

      // Apply appropriate styling
      if (isHeading) {
        return <h3 key={i} className="educational-heading" dangerouslySetInnerHTML={{ __html: processedText }} />;
      } else if (isBulletPoint) {
        return <li key={i} className="educational-bullet" dangerouslySetInnerHTML={{
          __html: processedText.replace(/^[-*]\s+/, '')
        }} />;
      } else if (paragraph.trim()) {
        // Split by single newline for multi-line paragraphs
        const lines = paragraph.split('\n');
        if (lines.length > 1) {
          return (
            <div key={i} className="paragraph-group">
              {lines.map((line, j) => {
                // Process bold text in each line
                const processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                return line.trim() ?
                  <p key={j} dangerouslySetInnerHTML={{ __html: processedLine }} /> :
                  <br key={j} />;
              })}
            </div>
          );
        }
        return <p key={i} dangerouslySetInnerHTML={{ __html: processedText }} />;
      }
      return <br key={i} />;
    });
  };

  return (
    <div className="open-chat-container">
      <h1 className="header">{responses.length === 0 ? "What can I help with?" : ""}</h1>

      <div className="open-conversation-area">
        {responses.map((res, idx) => (
          <div key={idx} className={`open-message ${res.type}`}>
            <div className="message-content">
              <div className={`message-text ${res.type === 'ai' ? 'educational-format' : ''}`}>
                {renderMessageText(res.text)}
              </div>
              {res.image && (
                <div className="message-image-container">
                  <img
                    src={res.image}
                    alt="User uploaded"
                    className="message-image-thumbnail"
                    onClick={() => handleImageExpand(res.image)}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <div className="input-section">
        <textarea
          className="chat-input"
          placeholder="Ask me any question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {imagePreview && (
          <div className="image-preview-container">
            <img
              src={imagePreview}
              alt="Selected"
              className="image-preview"
            />
            <button className="remove-image-btn" onClick={removeImage}>
              <FaTimes />
            </button>
          </div>
        )}

        <div className="input-tools">
          <div className="format-options">
            <button
              className={`format-button ${selectedFormat === 'homework' ? 'selected' : ''}`}
              onClick={() => handleFormatChange('homework')}
            >
              Homework Help
            </button>
            <button
              className={`format-button ${selectedFormat === 'stepbystep' ? 'selected' : ''}`}
              onClick={() => handleFormatChange('stepbystep')}
            >
              Step-by-Step Guide
            </button>
          </div>

          <div className="action-buttons">
            <div className="tool-button" onClick={handleImageClick}>
              <FaImage className="tool-icon" />
              <span className="tool-label">Upload</span>
              <input
                ref={fileInputRef}
                className="image-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className="tool-button" onClick={handleVoiceInput}>
              <FaMicrophone className={`tool-icon ${isListening ? 'listening' : ''}`} />
              <span className="tool-label">Voice</span>
            </div>

            <button
              className={`send-button ${loading ? 'loading' : ''}`}
              onClick={handleSend}
              disabled={loading}
            >
              <FaPaperPlane className="send-icon" />
              <span>{loading ? 'Sending...' : 'Send'}</span>
            </button>
          </div>
        </div>
      </div>

      {expandedImage && (
        <div className="image-modal-overlay" onClick={() => setExpandedImage(null)}>
          <div className="image-modal">
            <img src={expandedImage} alt="Enlarged" className="enlarged-image" />
            <button className="close-modal-btn" onClick={() => setExpandedImage(null)}>
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;