import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-brand-dark text-white py-8 mt-auto">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-2xl font-bold text-brand-yellow mb-2">Mc Ronald's</h2>
                    <p className="text-gray-400 text-sm">
                        La mejor parodia de comida rápida.<br />
                        Hecho con 💛 y 🍔.
                    </p>
                </div>

                <div className="flex gap-6 text-sm text-gray-300">
                    <span className="hover:text-white cursor-pointer transition-colors">Aviso Legal</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Privacidad</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Contacto</span>
                </div>
            </div>
            <div className="text-center text-gray-600 text-xs mt-8 border-t border-gray-800 pt-4">
                &copy; {new Date().getFullYear()} Mc Ronald's Corporation. Todos los derechos reservados.
            </div>
        </footer>
    );
};

export default Footer;
