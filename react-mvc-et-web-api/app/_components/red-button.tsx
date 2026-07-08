export default function RedButton({ onClick, children }: { onClick: any; children: React.ReactNode }) {

    return (
        <button onClick={onClick} className="bg-red-500 text-white py-1 px-2 rounded-sm mr-2">
            {children}
        </button>
    );
}
