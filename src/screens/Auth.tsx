import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabase';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<'sign_in' | 'sign_up'>('sign_up');

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/app/dashboard');
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img 
            src="/logo.svg" 
            alt="Zsonic.ai Logo" 
            className="w-48 h-auto invert"
          />
        </div>

        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          {authMode === 'sign_up' ? 'Create your account' : 'Welcome back'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-300">
          {authMode === 'sign_up' ? (
            <>Start your free trial. No credit card required.</>
          ) : (
            <>Sign in to your account to continue</>
          )}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/10 backdrop-blur-sm py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-white/20">
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#6366F1',
                    brandAccent: '#4F46E5',
                  },
                },
              },
              style: {
                button: {
                  borderRadius: '9999px',
                  padding: '10px 20px',
                  transition: 'all 0.2s ease',
                },
                container: {
                  gap: '16px',
                },
                input: {
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                },
                label: {
                  color: 'rgba(255, 255, 255, 0.8)',
                },
                message: {
                  color: 'rgba(255, 255, 255, 0.8)',
                },
              },
            }}
            view={authMode}
            providers={['google', 'facebook']}
            redirectTo={`${window.location.origin}/app/dashboard`}
          />

          <div className="mt-6">
            <button
              onClick={() => setAuthMode(authMode === 'sign_up' ? 'sign_in' : 'sign_up')}
              className="w-full text-center text-sm text-gray-300 hover:text-white transition-colors"
            >
              {authMode === 'sign_up'
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;