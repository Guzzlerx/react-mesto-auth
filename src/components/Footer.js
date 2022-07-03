function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <p className="footer__text-copyright">
                ©{currentYear}. Pasynkov Andrew
            </p>
        </footer>
    );
}

export default Footer;
