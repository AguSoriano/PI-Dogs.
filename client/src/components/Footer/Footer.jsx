import React from 'react';
import styles from './Footer.module.css';

function Footer() {
    let fecha = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.site_footer}>
                <div className={styles.copyright}>
                    <p>
                        Page created by Agustin_Soriano
                    </p>
                    <p>&copy; {fecha}. All Rights Reserved.</p>
                </div>
                <div className={styles.redes_sociales}>
                    <a href="https://www.linkedin.com/in/agustin-soriano-027876119/" target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="linkedin" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer