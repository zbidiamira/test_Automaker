import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Veterinary diagnostic system prompt
const SYSTEM_PROMPT = `You are an expert veterinary diagnostic assistant. Your role is to help pet owners understand potential health issues based on symptoms they observe in their pets.

IMPORTANT GUIDELINES:
1. Always emphasize that your analysis is NOT a substitute for professional veterinary care
2. Recommend seeing a veterinarian for serious symptoms
3. Consider species-specific conditions and treatments
4. Be clear about uncertainty when symptoms could indicate multiple conditions
5. Provide practical home care advice when appropriate
6. Flag emergency situations clearly

Respond ONLY with valid JSON in the following structure:
{
  "possibleConditions": [
    {
      "name": "Condition Name",
      "probability": "High/Medium/Low",
      "description": "Brief description of the condition",
      "commonIn": "Species/breeds commonly affected"
    }
  ],
  "recommendedActions": [
    "Action 1",
    "Action 2"
  ],
  "medications": [
    {
      "name": "Medication name (if applicable)",
      "type": "Over-the-counter/Prescription",
      "dosage": "General dosage guidance",
      "notes": "Important notes or warnings"
    }
  ],
  "warningSignsToWatch": [
    "Sign 1",
    "Sign 2"
  ],
  "homeCareTips": [
    "Tip 1",
    "Tip 2"
  ],
  "urgency": "Low/Medium/High/Emergency",
  "shouldSeeVet": true/false,
  "timeframe": "When to see a vet (e.g., 'within 24 hours', 'immediately')",
  "disclaimer": "This is AI-generated advice and should not replace professional veterinary consultation."
}`;

/**
 * Analyze symptoms and provide diagnostic suggestions
 * @param {string} species - The animal species
 * @param {string} breed - The animal breed (optional)
 * @param {number} age - The animal's age in years (optional)
 * @param {number} weight - The animal's weight (optional)
 * @param {string[]} symptoms - Array of symptoms
 * @param {string} additionalInfo - Additional context from the owner
 * @returns {Promise<object>} Diagnostic analysis
 */
export const analyzeSymptoms = async ({
  species,
  breed,
  age,
  weight,
  gender,
  symptoms,
  additionalInfo,
  duration,
}) => {
  try {
    // Build the user prompt
    const userPrompt = buildUserPrompt({
      species,
      breed,
      age,
      weight,
      gender,
      symptoms,
      additionalInfo,
      duration,
    });

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3, // Lower temperature for more consistent medical advice
      max_tokens: 2000,
      response_format: { type: 'json_object' },
    });

    // Parse the response
    const responseText = completion.choices[0]?.message?.content;
    
    if (!responseText) {
      throw new Error('No response received from AI');
    }

    const diagnosis = JSON.parse(responseText);
    
    // Add metadata
    diagnosis.analyzedAt = new Date().toISOString();
    diagnosis.model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
    
    return diagnosis;
  } catch (error) {
    console.error('AI Service Error:', error);
    
    // Handle specific OpenAI errors
    if (error.code === 'insufficient_quota') {
      throw new Error('AI service quota exceeded. Please try again later.');
    }
    
    if (error.code === 'invalid_api_key') {
      throw new Error('AI service configuration error. Please contact support.');
    }
    
    if (error instanceof SyntaxError) {
      throw new Error('Failed to parse AI response. Please try again.');
    }
    
    throw new Error(error.message || 'AI analysis failed. Please try again.');
  }
};

/**
 * Build the user prompt for symptom analysis
 */
const buildUserPrompt = ({
  species,
  breed,
  age,
  weight,
  gender,
  symptoms,
  additionalInfo,
  duration,
}) => {
  let prompt = `Please analyze the following symptoms for a ${species}`;
  
  if (breed) {
    prompt += ` (${breed})`;
  }
  
  prompt += ':\n\n';
  
  // Animal details
  prompt += '**Patient Information:**\n';
  prompt += `- Species: ${species}\n`;
  if (breed) prompt += `- Breed: ${breed}\n`;
  if (age) prompt += `- Age: ${age} years\n`;
  if (weight) prompt += `- Weight: ${weight} kg\n`;
  if (gender) prompt += `- Gender: ${gender}\n`;
  
  // Symptoms
  prompt += '\n**Reported Symptoms:**\n';
  symptoms.forEach((symptom, index) => {
    prompt += `${index + 1}. ${symptom}\n`;
  });
  
  // Duration
  if (duration) {
    prompt += `\n**Duration of Symptoms:** ${duration}\n`;
  }
  
  // Additional info
  if (additionalInfo) {
    prompt += `\n**Additional Information from Owner:**\n${additionalInfo}\n`;
  }
  
  prompt += '\nPlease provide a comprehensive analysis including possible conditions, recommended actions, and whether the pet should see a veterinarian.';
  
  return prompt;
};

/**
 * Get care recommendations for a specific condition
 * @param {string} species - The animal species
 * @param {string} condition - The condition to get recommendations for
 * @returns {Promise<object>} Care recommendations
 */
export const getCareRecommendations = async (species, condition) => {
  try {
    const prompt = `Provide detailed care recommendations for a ${species} diagnosed with or showing signs of "${condition}".

Include:
1. Home care tips
2. Diet recommendations
3. Activity level guidance
4. Warning signs that require immediate vet attention
5. Typical recovery timeline
6. Preventive measures for the future

Respond in JSON format:
{
  "condition": "${condition}",
  "species": "${species}",
  "homeCare": ["tip1", "tip2"],
  "dietRecommendations": ["recommendation1", "recommendation2"],
  "activityGuidance": "description",
  "warningSignsRequiringVet": ["sign1", "sign2"],
  "typicalRecoveryTime": "timeline description",
  "preventiveMeasures": ["measure1", "measure2"],
  "disclaimer": "Always consult with a veterinarian for proper diagnosis and treatment."
}`;

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { 
          role: 'system', 
          content: 'You are a veterinary care advisor. Provide helpful, accurate care recommendations while always emphasizing the importance of professional veterinary care.' 
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 1500,
      response_format: { type: 'json_object' },
    });

    const responseText = completion.choices[0]?.message?.content;
    
    if (!responseText) {
      throw new Error('No response received from AI');
    }

    return JSON.parse(responseText);
  } catch (error) {
    console.error('AI Recommendations Error:', error);
    throw new Error(error.message || 'Failed to get care recommendations.');
  }
};

/**
 * Check if AI service is properly configured
 * @returns {boolean}
 */
export const isConfigured = () => {
  return !!process.env.OPENAI_API_KEY;
};

export default {
  analyzeSymptoms,
  getCareRecommendations,
  isConfigured,
};
