import { Mail, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import BrandName from "../BrandName";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


const Footer = () => {
    const {user } = useContext(AuthContext);

    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative mt-20 border-t border-purple-100 bg-white/50 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    <div className="col-span-1 md:col-span-1">
                        <BrandName />
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Empowering developers to master the technology through interactive challenges and AI-driven insights.
                        </p>
                    </div>


                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Explore</h3>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link to={user ? '/' : '/login'} className="hover:text-purple-600 transition-colors">All Assessments</Link></li>
                            <li><Link to={user ? '/notes' : '/login'} className="hover:text-purple-600 transition-colors">Study Notes</Link></li>
                            <li><Link to={user ? '/profile' : '/login'} className="hover:text-purple-600 transition-colors">Progress</Link></li>
                        </ul>
                    </div>


                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Stay Updated</h3>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-100 text-sm focus:outline-none focus:border-purple-300 transition-all"
                            />
                            <button className="p-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all">
                                <Mail size={18} />
                            </button>
                        </div>
                    </div>
                </div>


            
                <div className="mt-12 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400 font-medium">
                    <p>© {currentYear} SkillSphere. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Made with <Heart size={14} className="text-red-400 fill-red-400" />
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;