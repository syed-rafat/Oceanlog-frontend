import Link from "next/link";
import React from "react";

export default function HomeSidebar() {

    return (
        <div>
            <section>
                <h3 className="text-xl font-pangram">Important Websites</h3>
                <div className="underline pl-2 pt-4 flex flex-col font-inter leading-5">
                <a href="https://www.un.org/sustainabledevelopment/oceans/" className="my-2">Sustainable development Goal by UN</a>
                <a href="https://education.nationalgeographic.org/resource/all-about-the-ocean" className="my-2">All about the Ocean</a>
                <a href="https://journals.ametsoc.org/view/journals/phoc/52/12/phoc.52.issue-12.xml" className="my-2">Journal of Physical Oceanography</a>
                </div>
            </section>
        </div>
    )
}