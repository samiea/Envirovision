import React, { Component } from "react";

class Header extends Component {
    render() {
        return (
            <>
                <header id="header" className="alt">
                    <h1>
                        <a href="index.html">Solid State</a>
                    </h1>
                    {/* <nav>
                        <a href="#menu">Menu</a>
                    </nav> */}
                </header>

                {/* <nav id="menu">
                    <div className="inner">
                        <h2>Menu</h2>
                        <ul className="links">
                            <li>
                                <a href="index.html">Home</a>
                            </li>
                            <li>
                                <a href="generic.html">Generic</a>
                            </li>
                            <li>
                                <a href="elements.html">Elements</a>
                            </li>
                            <li>
                                <a href="index.html">Log In</a>
                            </li>
                            <li>
                                <a href="index.html">Sign Up</a>
                            </li>
                        </ul>
                        <a href="index.html" className="close">
                            Close
                        </a>
                    </div>
                </nav> */}

                <section id="banner">
                    <div className="inner">
                        <h2>This is Solid State</h2>
                        <p>
                            Another free + fully responsive site template by{" "}
                            <a href="http://html5up.net">HTML5 UP</a>
                        </p>
                    </div>
                </section>
            </>
        );
    }
}

export default Header;
