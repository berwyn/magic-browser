import type { Route } from './+types/set';
import ScryfallCard, { type ScryfallCardObject } from '../cards/scryfall';

interface ScryfallCardListObject {
    total_cards: number
    has_more: boolean
    next_page: string
    data: ScryfallCardObject[]
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    const res = await fetch('https://api.scryfall.com/cards/search?' + new URLSearchParams({
            q: `set:${params.code}`,
            unique: 'prints',
            order: 'set',
            dir: 'asc',
            include_extras: 'true',
        }).toString());

    const cards: ScryfallCardListObject = await res.json();

    let data = cards.data;
    let fetchMore = cards.has_more;
    let nextUrl = cards.next_page;

    while (fetchMore) {
        const next = await fetch(nextUrl);
        const body: ScryfallCardListObject = await next.json();

        data = data.concat(body.data);

        fetchMore = body.has_more;
        nextUrl = body.next_page;
    }

    return { code: params.code, data };
}

export function HydrateFallback() {
    return <div>Loading...</div>;
}

export default function Set({
    loaderData
}: Route.ComponentProps) {
    const { code, data } = loaderData;
    return <div className="set-page">
        <h1 className="set-title">{code}</h1>
        <div className="set-grid">
            {data.filter(card => card.image_uris != null).map(card => 
                <ScryfallCard key={card.id} card={card} />
            )}
        </div>
    </div>;
}