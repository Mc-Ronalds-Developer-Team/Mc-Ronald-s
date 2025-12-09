import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-brand-dark text-white py-12 mt-auto border-t-8 border-brand-yellow">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-left">
                    <div>
                        <h2 className="text-3xl font-extrabold text-white mb-6 tracking-tight">
                            Mc Ronald's
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Llevando felicidad y sabor a cada rincón. Comprometidos con la calidad, la frescura y la mejor experiencia para nuestros clientes desde siempre.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Placeholders */}
                            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-red transition-colors cursor-pointer">
                                <span>FB</span>
                            </div>
                            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-red transition-colors cursor-pointer">
                                <span>IG</span>
                            </div>
                            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-red transition-colors cursor-pointer">
                                <span>TW</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-brand-yellow mb-6 uppercase tracking-wider">Nuestra Compañía</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="hover:text-white cursor-pointer transition-colors">Sobre Nosotros</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Trabaja con nosotros</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Nuestros Valores</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Sostenibilidad</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-brand-yellow mb-6 uppercase tracking-wider">Atención al Cliente</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="hover:text-white cursor-pointer transition-colors">Contáctanos</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Preguntas Frecuentes</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Términos y Condiciones</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Política de Privacidad</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-brand-yellow mb-6 uppercase tracking-wider">Encuéntranos</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Av. Principal 123, Lima, Perú.
                            <br />C.C. Real plaza
                        </p>
                        <p className="text-brand-red font-bold text-xl">
                            (01) 555-0100
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Mc Ronald's Corporation. Todos los derechos reservados.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <span className="hover:text-white cursor-pointer">Política de Cookies</span>
                        <span className="hover:text-white cursor-pointer">Mapa del Sitio</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
