import { Plus } from "lucide-react";
import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-3">
            <div className="bg-white p-6 rounded-xl w-full md:w-1/2 shadow-lg relative">

                <div>
                    {children}
                </div>

                <button
                    onClick={onClose}
                    className="flex justify-center items-center bg-slate-200 text-slate-900 rounded-full w-8 h-8 hover:bg-slate-300 cursor-pointer transition absolute right-2 top-2"
                >
                    <Plus className='rotate-45' />
                </button>

            </div>
        </div>
    );
};

export default Modal;
