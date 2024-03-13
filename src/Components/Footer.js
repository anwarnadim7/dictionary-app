import React from 'react'
import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer class="bg-gray-800 text-white py-4 bottom-0 w-full fixed flex justify-between items-center">
            <div class="container mx-auto text-left ml-4">
                <a href="https://github.com/anwarnadim7/dictionary-app.git"><span class="text-lg "><FaGithub size="20px" /></span></a>
            </div>
            <div class="container mx-auto text-right mr-4">
                <p>&copy; 2024 Dictionay. </p>
            </div>
        </footer>
    )
}
export default Footer
