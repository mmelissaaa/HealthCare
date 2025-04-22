# patient_feedback_sentiment.py

from transformers import pipeline
import re

class SentimentAnalyzer:
    """
    Improved AI-based Sentiment Analysis for patient feedback.
    Uses a pre-trained model from Hugging Face's transformers library
    with healthcare-specific enhancements.
    """

    def __init__(self, model_name="distilbert-base-uncased-finetuned-sst-2-english"):
        """
        Initialize the sentiment analysis pipeline with healthcare-specific enhancements.
        :param model_name: Pre-trained model for sentiment analysis (default is DistilBERT for SST-2).
        """
        self.sentiment_pipeline = pipeline("sentiment-analysis", model=model_name)
        
        # Healthcare-specific negative keywords/phrases
        self.negative_keywords = [
            "long wait", "waiting", "rude", "unhelpful", "expensive", "pain", 
            "unprofessional", "misdiagnosis", "poor", "awful", "terrible", 
            "horrible", "bad", "worst", "not good", "ineffective", "side effects",
            "complications", "disappointed", "unsatisfied", "disrespectful",
            "unclean", "dirty", "cold", "impersonal", "mistake", "error",
            "billing issue", "insurance problem", "very bad", "overpriced", "not worth"
        ]
        
        # Healthcare-specific positive keywords/phrases
        self.positive_keywords = [
            "excellent", "helpful", "caring", "professional", "kind", "attentive",
            "thorough", "knowledgeable", "efficient", "clean", "friendly",
            "compassionate", "listened", "prompt", "solved", "relieved",
            "comfortable", "explained", "clear", "respectful", "recommend",
            "satisfied", "grateful", "thank", "appreciate", "wonderful",
            "great", "amazing", "outstanding", "exceptional", "excellent"
        ]
        
        # Negation words that flip sentiment
        self.negation_words = [
            "not", "no", "never", "don't", "doesn't", "didn't", "wasn't",
            "weren't", "isn't", "aren't", "haven't", "hasn't", "couldn't",
            "can't", "won't", "wouldn't"
        ]

    def analyze_sentiment(self, text):
        """
        Enhanced analysis for healthcare feedback sentiment with context awareness.
        :param text: Patient feedback as a string.
        :return: Sentiment label and confidence score.
        """
        # Get base model prediction
        model_result = self.sentiment_pipeline(text)[0]
        model_label = model_result['label']
        model_confidence = model_result['score']
        
        # Convert text to lowercase for easier matching
        text_lower = text.lower()
        
        # Check for negation patterns that might flip sentiment
        contains_negation = any(re.search(r'\b' + word + r'\b', text_lower) for word in self.negation_words)
        
        # Count positive and negative keywords
        negative_count = sum(1 for keyword in self.negative_keywords if keyword in text_lower)
        positive_count = sum(1 for keyword in self.positive_keywords if keyword in text_lower)
        
        # Determine context-aware sentiment
        if negative_count > positive_count + 1:
            final_label = "NEGATIVE"
            # Adjust confidence based on keyword strength
            confidence_adjustment = min(0.3, 0.05 * (negative_count - positive_count))
            final_confidence = max(0.7, model_confidence - confidence_adjustment if model_label == "POSITIVE" else model_confidence + confidence_adjustment)
        elif positive_count > negative_count + 1:
            final_label = "POSITIVE"
            # Adjust confidence based on keyword strength
            confidence_adjustment = min(0.3, 0.05 * (positive_count - negative_count))
            final_confidence = max(0.7, model_confidence - confidence_adjustment if model_label == "NEGATIVE" else model_confidence + confidence_adjustment)
        elif contains_negation and model_label == "POSITIVE" and negative_count > 0:
            # Handle cases like "not good" that might be misclassified
            final_label = "NEGATIVE"
            final_confidence = max(0.65, model_confidence)
        elif contains_negation and model_label == "NEGATIVE" and positive_count > 0:
            # Handle cases like "not bad" that might be misclassified
            final_label = "POSITIVE"
            final_confidence = max(0.65, model_confidence)
        else:
            # Fall back to model prediction with slight adjustment
            final_label = model_label
            final_confidence = model_confidence
        
        # Additional healthcare-specific context analysis
        if "but " in text_lower or "however" in text_lower:
            # Check if the feedback contains a contrast that might change sentiment
            parts = re.split(r'\bbut\b|\bhowever\b', text_lower, flags=re.IGNORECASE)
            if len(parts) > 1:
                # The part after "but" or "however" often carries the main sentiment
                last_part = parts[-1]
                last_part_negative = any(keyword in last_part for keyword in self.negative_keywords)
                last_part_positive = any(keyword in last_part for keyword in self.positive_keywords)
                
                if last_part_negative and not last_part_positive:
                    final_label = "NEGATIVE"
                    final_confidence = max(0.7, model_confidence)
                elif last_part_positive and not last_part_negative:
                    final_label = "POSITIVE"
                    final_confidence = max(0.7, model_confidence)
        
        return final_label, final_confidence

    def provide_recommendations(self, sentiment, confidence, feedback):
        """
        Provide more detailed recommendations based on sentiment and feedback content.
        :param sentiment: Sentiment label (POSITIVE or NEGATIVE)
        :param confidence: Confidence score of the sentiment
        :param feedback: Original feedback text
        :return: Actionable recommendations
        """
        feedback_lower = feedback.lower()
        
        if sentiment == "POSITIVE":
            if confidence > 0.9:
                return "Thank you for your excellent feedback! We're delighted to hear about your positive experience. We'll share your comments with our team to reinforce these positive practices."
            else:
                return "Thank you for your positive feedback! We're glad to hear about your experience. We'll continue to maintain and improve our services."
        elif sentiment == "NEGATIVE":
            # Identify specific areas of concern
            areas_of_concern = []
            
            if any(keyword in feedback_lower for keyword in ["wait", "waiting", "long", "time", "hours", "delay"]):
                areas_of_concern.append("wait times")
            
            if any(keyword in feedback_lower for keyword in ["rude", "unprofessional", "disrespectful", "attitude"]):
                areas_of_concern.append("staff conduct")
            
            if any(keyword in feedback_lower for keyword in ["expensive", "cost", "price", "billing", "insurance", "charge"]):
                areas_of_concern.append("billing and costs")
            
            if any(keyword in feedback_lower for keyword in ["clean", "dirty", "hygiene", "sanitary", "environment"]):
                areas_of_concern.append("facility cleanliness")
            
            if any(keyword in feedback_lower for keyword in ["diagnosis", "treatment", "care", "medication", "prescription"]):
                areas_of_concern.append("medical care quality")
            
            if areas_of_concern:
                concerns_text = ", ".join(areas_of_concern[:-1])
                if len(areas_of_concern) > 1:
                    concerns_text += f" and {areas_of_concern[-1]}"
                else:
                    concerns_text = areas_of_concern[0]
                
                return f"We sincerely apologize for your negative experience regarding {concerns_text}. Your feedback is extremely valuable and will be escalated to our management team. We are committed to addressing these specific issues promptly."
            else:
                return "We're sorry to hear about your experience. Your feedback is valuable to us. We will address the issues and work on improving our services."
        else:
            return "Thank you for your feedback. We will review it and take necessary actions to improve."

# Main function to interact with the user
def main():
    # Initialize the improved sentiment analyzer
    analyzer = SentimentAnalyzer()

    print("Welcome to the Patient Feedback Sentiment Analysis System!")
    print("Please share your feedback about our healthcare services.\n")

    while True:
        # Take user input
        feedback = input("Enter your feedback (or type 'exit' to quit): ")

        # Exit condition
        if feedback.lower() == "exit":
            print("Thank you for using the feedback system. Have a great day!")
            break

        # Analyze sentiment with the improved analyzer
        sentiment, confidence = analyzer.analyze_sentiment(feedback)
        print(f"\nSentiment: {sentiment} (Confidence: {confidence:.2f})")

        # Provide more specific recommendations based on sentiment and feedback content
        recommendations = analyzer.provide_recommendations(sentiment, confidence, feedback)
        print("Recommendations:", recommendations)

        # Additional insights based on sentiment and confidence
        if sentiment == "NEGATIVE":
            if confidence > 0.85:
                print("This feedback has been flagged as highly negative and will be escalated to senior management for immediate review.")
            else:
                print("We will escalate your feedback to the concerned department for prompt action.")
        elif sentiment == "POSITIVE":
            if confidence > 0.85:
                print("We're thrilled to hear about your excellent experience! Your feedback will be shared with our team as a best practice example.")
            else:
                print("We appreciate your kind words and will share them with our team to keep up the good work!")
        else:
            print("We will carefully review your feedback to identify areas for improvement.")

        print("\n" + "=" * 50 + "\n")

# Run the program
if __name__ == "__main__":
    main()