const Footer = () => {
    return(
        <div className="container">
            <div className="xb-footer-bottom">
                <div className="xb-footer-wrap ul_li_between">
                    <div className="xb-item--footer_widget mb-30">
                        <span>Useful Links</span>
                        <ul className="xb-item--footer_widget-list">
                            <li><a href="">Contact us</a></li>
                            <li><a href="">How it Works</a></li>
                            <li><a href="">Terms</a> </li>
                        </ul>
                    </div>
                    <div className="xb-item--footer_widget mb-30">
                        <span>Solution</span>
                        <ul className="xb-item--footer_widget-list">
                            <li><a href="">Ecosystem</a></li>
                            <li><a href="">Investment</a></li>
                            <li><a href="">Portal</a></li>
                        </ul>
                    </div>
                    <div className="xb-item--footer_widget mb-30">
                        <span>Need Help?</span>
                        <ul className="xb-item--footer_widget-list">
                            <li><a href="tel:1236567766">+(1) 523 356 7766</a></li>
                            <li className="underline"><a href="mailto:@.com">crycominerintive@.com</a></li>
                        </ul>
                    </div>
                    
                </div>
                <div className="footer-copyright text-center">
                    Copyright © 2024 Miner. All rights reserved.
                </div>
            </div>
        </div>
    );
}

export default Footer;