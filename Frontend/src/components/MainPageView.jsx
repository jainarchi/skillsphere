import { Award, Star, Zap } from "lucide-react";

const MainPageView = () => {
  return (
    <div className="relative  overflow-hidden px-4 py-10 md:py-16">
      <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-purple-500/5 text-center relative z-10">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200 rotate-3">
            <Award size={40} className="text-white" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-[900] text-gray-900 mb-4 tracking-tighter">
          <span className="font-semibold text-gray-600 text-2xl md:text-5xl block md:inline mb-1 md:mb-0">
            Welcome to{" "}
          </span>
          Skill
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            Sphere
          </span>
        </h1>
        <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-6 italic opacity-90">
          Tech Master
        </h2>

        <p className="text-gray-600 max-w-xl mx-auto mb-10 text-base md:text-lg font-medium leading-6.5">
          Prepare for technical assessments with Timed challenges, Tab switching detection,
          In-depth analysis, and Progress tracking.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          <div className="group relative flex items-center gap-4 bg-white p-5 rounded-2xl border border-purple-50 shadow-sm transition-all duration-500 hover:border-purple-300 hover:shadow-[0_15px_30px_-10px_rgba(168,85,247,0.2)]">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0 group-hover:bg-purple-600 transition-colors duration-300">
              <Star
                size={22}
                className="text-purple-600 group-hover:text-white"
              />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-800 text-base">
                8+ Tech Stacks
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                React, Node, JS & more.
              </p>
            </div>
          </div>

          <div className="group relative flex items-center gap-4 bg-white p-5 rounded-2xl border border-indigo-50 shadow-sm transition-all duration-500 hover:border-indigo-300 hover:shadow-[0_15px_30px_-10px_rgba(99,102,241,0.2)]">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 transition-colors duration-300">
              <Zap
                size={22}
                className="text-indigo-600 group-hover:text-white"
              />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-800 text-base">
                Adaptive Levels
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                Beginner to Advanced.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageView;
