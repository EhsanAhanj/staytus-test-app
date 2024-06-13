import { useTango } from '@staytus/tango';
import { Film, Planet } from '@staytus/types';
import { useWindowSize } from '@staytus/utils';
import dayjs from 'dayjs';

export type PlanetCardProps = Planet;
const PlanetCard = (props: PlanetCardProps) => {
  const { isMobile } = useWindowSize();
  const [state] = useTango();
  const filmsDescription = props.films
    .map((el) => (state.films as Film[])?.find((ele) => ele.url === el)?.title)
    .join(' ,');

  const PlanetCardCenterMobile = (props: PlanetCardProps) => (
    <div className="flex w-full items-center gap-4">
      <div className=" text-white text-3xl rounded-full h-14 w-14 flex items-center justify-center bg-gradient-to-b from-[#8A898A] to-[#5A5A5F]">
        B
      </div>
      <div className="flex flex-col">
        <div className="text-[#FAFAFA] text-3xl font-bold">{props.name}</div>
        <div className="text-[#818187] text-2xl font-bold">{props.climate}</div>
      </div>
      <Icon className="fill-current text-[#F7CF55] ml-auto w-12 h-12" />
    </div>
  );
  const PlanetCardCenterDesktop = (props: PlanetCardProps) => (
    <div className="flex w-full items-center gap-4">
      <div className=" text-white text-3xl rounded-xl h-14 w-14 flex items-center justify-center bg-[#3F3F46]">
        <Icon className="fill-current text-[#F7CF55] w-12 h-12" />
      </div>
      <div className="flex flex-col">
        <div className="text-[#FAFAFA] text-2xl font-bold">{props.name}</div>
        <div className="text-[#7F7F87] text-2xl">{filmsDescription}</div>
      </div>
      <div className="text-[#818187] text-2xl font-bold ml-auto">
        {props.climate}
      </div>
    </div>
  );
  return (
    <div className="bg-[#3F4045] md:bg-[#27272A] rounded-md p-5 w-full min-h-40 flex flex-col gap-4">
      <div className="flex w-full justify-between">
        <h3 className="font-bold text-[#F2CA42]">
          {dayjs(props.created).format('YYYY MM DD')}
        </h3>
        <h3 className="font-bold text-[#F2CA42] hidden md:block">
          {dayjs(props.created).format('ddd hh:mm, A')}
        </h3>
      </div>
      {isMobile ? (
        <PlanetCardCenterMobile {...props} />
      ) : (
        <PlanetCardCenterDesktop {...props} />
      )}
      <div className="md:hidden text-[#E4E4E6] font-bold text-3xl">
        {filmsDescription}
      </div>
    </div>
  );
};

export default PlanetCard;

type SvgProps = React.SVGAttributes<SVGElement> | undefined;

const Icon = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path d="M16 4C16 2.89 16.89 2 18 2C19.11 2 20 2.89 20 4C20 5.11 19.11 6 18 6C16.89 6 16 5.11 16 4ZM20 22V16H22.5L19.96 8.37C19.68 7.55 18.92 7 18.06 7H17.94C17.08 7 16.31 7.55 16.04 8.37L15.18 10.95C16.26 11.55 17 12.68 17 14V22H20ZM12.5 11.5C13.33 11.5 14 10.83 14 10C14 9.17 13.33 8.5 12.5 8.5C11.67 8.5 11 9.17 11 10C11 10.83 11.67 11.5 12.5 11.5ZM5.5 6C6.61 6 7.5 5.11 7.5 4C7.5 2.89 6.61 2 5.5 2C4.39 2 3.5 2.89 3.5 4C3.5 5.11 4.39 6 5.5 6ZM7.5 22V15H9V9C9 7.9 8.1 7 7 7H4C2.9 7 2 7.9 2 9V15H3.5V22H7.5ZM14 22V18H15V14C15 13.18 14.32 12.5 13.5 12.5H11.5C10.68 12.5 10 13.18 10 14V18H11V22H14Z" />
  </svg>
);
