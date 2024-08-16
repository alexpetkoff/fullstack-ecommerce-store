interface CardProps {
    title?: string;
    subtitle?: number | string;
    body?: string;
}

export default function Card({ title, subtitle, body }: CardProps) {
    return (
        <div className="flex flex-col gap-4 border-slate-400 border-[1px] border-opacity-20 p-2">
            <div>
                <h3 className="text-[18px] text-black font-bold">{title}</h3>
                <p className="text-[12px] text-slate-600">{subtitle}</p>
            </div>
            <p>{body}</p>
        </div>
    );
}
