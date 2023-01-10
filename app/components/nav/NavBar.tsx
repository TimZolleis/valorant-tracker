import { Profile } from '~/components/user/Profile';

const NavBar = () => {
    return (
        <div className={'w-full p-3 bg-valorant-blue flex justify-between'}>
            <p className={'font-work-sans font-semibold text-headline-medium text-white'}>
                valorant.track
            </p>
            <Profile />
        </div>
    );
};

export default NavBar;
