import React, { Component } from "react";

class Header extends Component {
    render() {
        return (
            <section id="banner">
                <div className="inner">
                    <h2>Envirovision</h2>
                    <p>
                        An artistic data-driven rendition of climate change over the past several decades through data sonification and visualization
                    </p>
                </div>
            </section>
        );
    }
}

export default Header;
