import Link from "next/link"

export const Footer = () => {
    return (
        <footer>
        <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between w-full px-10 pb-3 items-center h-20 md:h-10 -mt-20 md:-mt-10'>
            <Link href="/policy/gdpr" className='text-start opacity-50 md:w-1/3 text-xs'>GDPR policy</Link>
            <Link href="/policy/terms-conditions" className='text-center opacity-50 md:w-1/3 text-xs'>General Terms & Conditions</Link>
            <p className=' text-end md:w-1/3 opacity-50 text-xs'>© 2024 TOVA E CIRK</p>
        </div>
    </footer>
    )
}