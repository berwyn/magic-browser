import { useRef } from 'react';

export interface ScryfallCardObject {
    id: string
    image_uris: {
        small: string
        normal: string
        large: string
        png: string
        art_crop: string
        border_crop: string
    }
}

interface Props {
    card: ScryfallCardObject
}

export default function ScryfallCard({ card }: Props) {
    const modalRef = useRef(null);

    return <>
        <img src={card.image_uris.normal} loading="lazy" onClick={() => modalRef.current?.showModal()} />
        <dialog className="card-modal" ref={modalRef} closedby="any">
            <div className="card-modal--content">
                <img src={card.image_uris.large} loading="lazy" />
                <form method="dialog">
                    <button autoFocus>
                        Close
                    </button>
                </form>
            </div>
        </dialog>
    </>;
}