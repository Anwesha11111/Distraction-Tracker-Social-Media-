import React, { useState, useEffect } from 'react';
import { Leaf, Clock, TrendingUp, Award, Settings, BarChart3, Calendar, X } from 'lucide-react';

const DistractionLeaf = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dailyLimits, setDailyLimits] = useState({
    instagram: 30,
    youtube: 60,
    facebook: 30,
    tiktok: 20,
    twitter: 30
  });
  
  const [usageData, setUsageData] = useState({
    instagram: 24,
    youtube: 45,
    facebook: 12,
    tiktok: 8,
    twitter: 15
  });

  const [streak, setStreak] = useState(3);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    // Load data from storage
    const saved = localStorage.getItem('distractionLeaf');
    if (saved) {
      const data = JSON.parse(saved);
      setUsageData(data.usage || usageData);
      setDailyLimits(data.limits || dailyLimits);
      setStreak(data.streak || 3);
    }
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('distractionLeaf', JSON.stringify({
      usage: usageData,
      limits: dailyLimits,
      streak: streak
    }));
  }, [usageData, dailyLimits, streak]);

  const totalUsage = Object.values(usageData).reduce((a, b) => a + b, 0);
  const totalLimit = Object.values(dailyLimits).reduce((a, b) => a + b, 0);

  const apps = [
    { name: 'Instagram', key: 'instagram', color: '#E4405F', icon: '📸' },
    { name: 'YouTube', key: 'youtube', color: '#FF0000', icon: '▶️' },
    { name: 'Facebook', key: 'facebook', color: '#1877F2', icon: '👥' },
    { name: 'TikTok', key: 'tiktok', color: '#000000', icon: '🎵' },
    { name: 'X/Twitter', key: 'twitter', color: '#1DA1F2', icon: '🐦' }
  ];

  const getHealthStatus = (used, limit) => {
    const percentage = (used / limit) * 100;
    if (percentage < 70) return { color: '#32CD32', status: 'healthy', emoji: '🌿' };
    if (percentage < 100) return { color: '#FFA500', status: 'warning', emoji: '🍂' };
    return { color: '#DC143C', status: 'over', emoji: '🍁' };
  };

  const formatTime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  const LeafCircle = ({ used, limit, color }) => {
    const percentage = Math.min((used / limit) * 100, 100);
    const health = getHealthStatus(used, limit);
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-24 h-24">
        <svg className="transform -rotate-90 w-24 h-24">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="#e0e0e0"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke={health.color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">{health.emoji}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      {/* Floating Vector Leaves Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => {
          const leafTypes = [
            // Monstera Leaf
            <svg key={i} className="w-24 h-24" viewBox="0 0 100 100">
              <path d="M50 10 Q60 20 55 35 L70 40 Q75 45 70 50 L85 55 Q88 60 82 65 L70 70 Q60 80 50 90 Q40 80 30 70 L18 65 Q12 60 15 55 L30 50 Q25 45 30 40 L45 35 Q40 20 50 10 Z" 
                    fill="currentColor" className="text-green-500/20" />
              <path d="M50 20 L50 85 M35 40 L65 40 M30 55 L70 55 M35 70 L65 70" 
                    stroke="currentColor" strokeWidth="2" className="text-green-600/15" />
            </svg>,
            // Fern Leaf
            <svg key={i} className="w-20 h-32" viewBox="0 0 80 120">
              <path d="M40 10 Q42 20 45 30 Q50 28 55 32 Q52 38 48 42 Q52 48 50 55 Q45 52 40 55 Q35 52 30 55 Q28 48 32 42 Q28 38 25 32 Q30 28 35 30 Q38 20 40 10 Z" 
                    fill="currentColor" className="text-emerald-500/20" />
              <path d="M40 10 L40 110 M40 25 Q30 30 25 25 M40 35 Q50 40 55 35 M40 45 Q28 50 23 45 M40 55 Q52 60 57 55 M40 65 Q27 70 22 65 M40 75 Q53 80 58 75 M40 85 Q26 90 21 85 M40 95 Q54 100 59 95" 
                    stroke="currentColor" strokeWidth="1.5" className="text-emerald-600/15" />
            </svg>,
            // Simple Oval Leaf
            <svg key={i} className="w-16 h-28" viewBox="0 0 60 100">
              <ellipse cx="30" cy="50" rx="25" ry="45" fill="currentColor" className="text-green-400/20" />
              <path d="M30 10 L30 90 M30 30 Q20 35 15 30 M30 40 Q40 45 45 40 M30 50 Q18 55 13 50 M30 60 Q42 65 47 60 M30 70 Q20 75 15 70" 
                    stroke="currentColor" strokeWidth="1.5" className="text-green-600/20" />
            </svg>,
            // Oak Leaf
            <svg key={i} className="w-20 h-24" viewBox="0 0 80 100">
              <path d="M40 10 Q45 15 42 22 Q48 20 50 25 Q48 32 42 35 Q48 38 48 45 Q45 50 40 50 Q35 50 32 45 Q32 38 38 35 Q32 32 30 25 Q32 20 38 22 Q35 15 40 10 Z M40 50 L40 90" 
                    fill="currentColor" className="text-lime-500/20" />
              <path d="M40 10 L40 90" stroke="currentColor" strokeWidth="2" className="text-lime-600/15" />
            </svg>
          ];
          
          const leaf = leafTypes[i % 4];
          const size = 60 + Math.random() * 80;
          
          return (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${15 + i * 3}s`,
                width: `${size}px`,
                height: `${size}px`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            >
              {leaf}
            </div>
          );
        })}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <header className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 mb-6 border-2 border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-3 rounded-2xl">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-green-800" style={{ fontFamily: 'Georgia, serif' }}>
                  Distraction Leaf
                </h1>
                <p className="text-sm text-green-600">Your digital forest guardian 🌿</p>
              </div>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-3 hover:bg-green-100 rounded-xl transition-colors"
            >
              <Settings className="w-6 h-6 text-green-700" />
            </button>
          </div>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border-2 border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold text-green-700">Today's Total</span>
            </div>
            <p className="text-3xl font-bold text-green-800">{formatTime(totalUsage)}</p>
            <p className="text-xs text-green-600 mt-1">Limit: {formatTime(totalLimit)}</p>
          </div>

          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border-2 border-amber-200">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-semibold text-amber-700">Streak</span>
            </div>
            <p className="text-3xl font-bold text-amber-800">{streak} days</p>
            <p className="text-xs text-amber-600 mt-1">🌱 Forest growing strong!</p>
          </div>

          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">Health Score</span>
            </div>
            <p className="text-3xl font-bold text-blue-800">
              {Math.round(100 - (totalUsage / totalLimit) * 100)}%
            </p>
            <p className="text-xs text-blue-600 mt-1">
              {totalUsage < totalLimit ? 'Excellent!' : 'Time to rest 🍂'}
            </p>
          </div>
        </div>

        {/* App Usage Cards */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 mb-6 border-2 border-green-200">
          <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            App Breakdown
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {apps.map(app => {
              const used = usageData[app.key];
              const limit = dailyLimits[app.key];
              const health = getHealthStatus(used, limit);

              return (
                <div key={app.key} className="text-center">
                  <LeafCircle used={used} limit={limit} color={app.color} />
                  <div className="mt-2">
                    <span className="text-xl">{app.icon}</span>
                    <p className="text-sm font-semibold text-gray-700 mt-1">{app.name}</p>
                    <p className="text-lg font-bold" style={{ color: health.color }}>
                      {formatTime(used)}
                    </p>
                    <p className="text-xs text-gray-500">/ {formatTime(limit)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 border-2 border-green-200">
          <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Weekly Insights
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
              <span className="text-sm text-green-700">🌟 Most productive day</span>
              <span className="font-bold text-green-800">Thursday (42min)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl">
              <span className="text-sm text-amber-700">⏰ Peak distraction time</span>
              <span className="font-bold text-amber-800">8-10 PM</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
              <span className="text-sm text-blue-700">💡 Tip</span>
              <span className="font-bold text-blue-800">Replace 10min scroll with a walk!</span>
            </div>
          </div>
        </div>

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border-2 border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-green-800">Daily Limits</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {apps.map(app => (
                  <div key={app.key} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-700">
                      <span>{app.icon}</span>
                      {app.name}
                    </span>
                    <input
                      type="number"
                      value={dailyLimits[app.key]}
                      onChange={(e) => setDailyLimits({
                        ...dailyLimits,
                        [app.key]: parseInt(e.target.value) || 0
                      })}
                      className="w-20 px-3 py-2 border-2 border-green-200 rounded-xl text-center focus:outline-none focus:border-green-400"
                      min="0"
                    />
                    <span className="text-sm text-gray-500">min</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
              >
                Save Changes 🌿
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default DistractionLeaf;