import { SurveyForm } from "@/components/survey/SurveyForm";

export default function SurveyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <SurveyForm onSurveySubmitted={function (): void {
        throw new Error("Function not implemented.");
      } } />
    </div>
  );
}