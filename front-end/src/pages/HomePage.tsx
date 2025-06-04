import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import { useState } from 'react';
import { SurveyForm } from '@/components/survey/SurveyForm';
import { SurveyResults } from '@/components/results/SurveyResults';

export default function HomePage() {

  const [activeTab, setActiveTab] = useState<'survey' | 'results'>('survey');
  const [surveySubmittedCount, setSurveySubmittedCount] = useState(0);

  const handleSurveySubmitted = () => {
    setSurveySubmittedCount(prev => prev + 1);
    setActiveTab('results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <Card className="bg-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Survey Platform
                  </h1>
                </div>
                <nav className="flex gap-2">
                  <Button
                    variant={activeTab === 'survey' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('survey')}
                    className={`transition-all duration-300 rounded-full px-6 h-11 ${
                      activeTab === 'survey' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg' 
                        : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50 border-blue-200'
                    }`}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Fill Out Survey
                  </Button>
                  <Button
                    variant={activeTab === 'results' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('results')}
                    className={`transition-all duration-300 rounded-full px-6 h-11 ${
                      activeTab === 'results' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg' 
                        : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50 border-blue-200'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Results
                  </Button>
                </nav>
              </div>
            </CardContent>
          </Card>
        </header>

        <main className="transition-all duration-300">
          {activeTab === 'survey' && <SurveyForm onSurveySubmitted={handleSurveySubmitted} />}
          {activeTab === 'results' && <SurveyResults key={surveySubmittedCount} />}
        </main>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Survey Platform. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}