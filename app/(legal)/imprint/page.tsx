import { ObfuscateSensibleText } from '@/components/ObfuscateSensibleText';
import { ReactNode } from 'react';

export default function ImprintPage(): ReactNode {
    return (
        <div className="flex flex-col items-center">
            <h1>Imprint</h1>
            <div className="w-max-[32rem]">
                <b>Responsible entity:</b>
                <br />
                Lorenzo Lettieri
                <br />
                Oberwolfhauserstrasse 2a
                <br />
                8633 Wolfhausen
                <br />
                Switzerland
                <br />
                <strong>Email</strong>:{' '}
                <ObfuscateSensibleText email="me@lore-le.ch" />
                <br />
                <br />
                <strong>Disclaimer</strong>
                <br />
                The author assumes no liability for the correctness, accuracy,
                timeliness, reliability and completeness of the information.
                <br />
                Liability claims against the author for material or immaterial
                damage resulting from access to, use or non-use of the published
                information, from misuse of the connection or from technical
                malfunctions are excluded.
                <br />
                <br />
                All offers are non-binding. The author expressly reserves the
                right to change, add to, or delete parts of the pages or the
                entire offer without prior notice, or to temporarily or
                permanently cease publication.
                <br />
                <br />
                <strong>Disclaimer for content and links</strong>
                <br />
                References and links to third party websites are outside our
                area of responsibility. It rejected any responsibility for such
                websites. Access to and use of such websites is at the
                user&apos;s own risk.
                <br />
                <br />
                <strong>Copyright declaration</strong>
                <br />
                The copyrights and all other rights to content, images, photos
                or other files on this website belong exclusively to Lorenzo
                Lettieri or the specifically named rights holders. The written
                consent of the copyright holder must be obtained in advance for
                the reproduction of any elements.
                <br />
                <br />
                <strong>Source</strong>:{' '}
                <a
                    href="https://brainbox.swiss/"
                    className="text-inherit underline"
                >
                    BrainBox Solutions
                </a>
            </div>
        </div>
    );
}
