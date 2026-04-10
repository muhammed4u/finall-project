interface Props {
    title: string;
    }

    export default function CategoryDetailsCard({ title }: Props) {
    return (
        <div className="group relative bg-white rounded-3xl border border-gray-100 
                shadow-sm hover:shadow-2xl 
                transition-all duration-500 
                hover:-translate-y-2 
                overflow-hidden cursor-pointer p-8">

    <div className="absolute inset-0 bg-gradient-to-br 
                    from-green-50 via-transparent to-emerald-50 
                    opacity-0 group-hover:opacity-100 
                    transition duration-500" />

    <div className="relative flex flex-col gap-6">

        <div className="w-14 h-14 rounded-2xl 
                        bg-gradient-to-br from-emerald-500 to-green-400
                        flex items-center justify-center 
                        shadow-md
                        transition-all duration-500
                        group-hover:scale-110 group-hover:rotate-6">

            <div className="w-6 h-6 bg-white rounded-md" />
        </div>

        <h3 className="text-lg font-semibold text-gray-800 
            transition-colors duration-300 
            group-hover:text-emerald-600">
            {title}
        </h3>

        <div className="absolute bottom-6 right-6 
                        text-emerald-500 opacity-0 
                        translate-x-3 
                        group-hover:opacity-100 
                        group-hover:translate-x-0 
                        transition-all duration-300">
            →
        </div>

    </div>
</div>

    );
}

