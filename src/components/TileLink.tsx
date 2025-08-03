// components/TileLink.tsx
import Link from "next/link";

type TileLinkProps = {
    href: string;
    label: string;
};

export default function TileLink({ href, label }: TileLinkProps) {
    return (
        <Link href={href} className="tile-button">
            {label}
        </Link>
    );
}
