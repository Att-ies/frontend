import Button from '@components/common/Button';
import DivisionBar from '@components/common/DivisionBar';
import ErrorMessage from '@components/common/ErrorMessage';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import AskPriceModal from '@components/auction/AskPriceModal';
import useGetBiddingHistory from '@hooks/queries/auction/useGetBiddingHistory';
import { priceToString } from '@utils/priceToString';
import { useCountDown } from '@hooks/useCountDown';
import { leatAskPrice } from '@utils/leastAskPrice';
import usePutBiddng from '@hooks/mutations/usePutBidding';
import useGetProfile from '@hooks/queries/useGetProfile';
import moment from 'moment';
interface inputForm {
  price: string;
}

export default function Bidding() {
  const router = useRouter();
  const artWorkId = Number(router.query.id);
  const { data } = useGetBiddingHistory(artWorkId);
  const { artWork, auction, biddingList, totalBiddingCount } = data || {};
  const { mutate } = usePutBiddng(+artWorkId!);
  const { data: userInfo } = useGetProfile();
  const [days, hours, minutes, seconds] = useCountDown?.(
    auction?.endDate || '',
  );
  const remaind = +days + +hours + +minutes + +seconds;
  const [isBlurred, setIsBlurred] = useState(true);
  const isMine = artWork?.artist === userInfo?.id;

  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<inputForm>({
    mode: 'onTouched',
  });

  useEffect(() => {
    if (data) {
      if (data.artWork.topPrice === null)
        setValue('price', priceToString(data.artWork.beginPrice));
      else {
        setValue('price', priceToString(leatAskPrice(data.artWork.topPrice)));
      }
    }
  }, [data]);

  const [isModal, setIsModal] = useState<boolean>(false);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/,/g, '');
    setValue('price', Number(value).toLocaleString('kr-KR') + '');
    if (isBlurred) trigger();
  };

  const onSubmit = (form: inputForm) => {
    const Price = form.price.replace(/,/g, '');
    mutate({ price: +Price });
  };

  return (
    <Layout>
      <Navigate
        isLeftButton={false}
        className="text-18 font-medium"
        message="????????????"
        handleRightButton={() => router.back()}
      />
      <div className="top-100px absolute inset-x-0 mx-auto  max-w-[420px] border-b border-brand" />
      <section>
        <article className="mt-3">
          <div className="textd-16 font-medium">????????????</div>
          <div className="mt-3 flex items-center">
            <div className="relative h-[97px] w-[85px] overflow-hidden rounded-[4px]">
              {artWork?.image && (
                <Image
                  alt="image"
                  src={artWork?.image}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="ml-3 h-fit flex-col">
              <p className="text-15 font-semibold leading-5">
                {artWork?.title}
              </p>
              <p className="mt-1 text-[12.44px] text-font-500">
                {artWork?.artistName}
                <span className="ml-[6px]">{artWork?.genre}</span>
              </p>
              <div className="mt-3 text-[13px] font-medium text-font-500">
                <p className="leading-5">
                  ?????????
                  <span className="ml-2 text-brand">
                    KRW {artWork?.topPrice && priceToString(artWork?.topPrice)}
                    (?????? {totalBiddingCount})
                  </span>
                </p>
                <p className="leading-5">
                  ?????????
                  <span className="ml-2 font-semibold text-[#191919]">
                    KRW{' '}
                    {artWork?.beginPrice && priceToString(artWork?.beginPrice)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </article>
        <article className="mt-5 flex h-[70px] items-center rounded-xl border border-[#D9D9D9]">
          <div className="flex w-2/5 flex-col items-center border-r border-[#D9D9D9]">
            <p className="flex">
              <Image
                alt=""
                src="/svg/icons/icon_clock_black.svg"
                width="17"
                height="0"
              />
              <span className="ml-1 text-14">????????????</span>
            </p>
            <p className="w-full text-center text-16 font-semibold">
              {remaind > 0 ? (
                days ? (
                  <span>
                    {days}??? {hours}:{minutes}:{seconds}
                  </span>
                ) : (
                  <span>
                    {hours}:{minutes}:{seconds}
                  </span>
                )
              ) : (
                '????????????'
              )}
            </p>
          </div>
          <div className="flex w-3/5 flex-col items-center">
            <p className="flex">
              <Image
                alt=""
                src="/svg/icons/icon_clock_black.svg"
                width="17"
                height="0"
              />
              <span className="ml-1 text-14">????????????</span>
            </p>
            <p className="text-16 font-semibold">
              {auction?.startDate.split('-').slice(0, 3).join('-') +
                ' ' +
                auction?.startDate.split('-').slice(3, 5).join(':')}
            </p>
          </div>
        </article>
      </section>
      <DivisionBar className="absolute inset-x-0 mx-auto mt-6" />
      <section>
        <article className="mt-14 flex justify-between ">
          <span className="text-16 font-medium">????????????</span>
          <span
            className="font-meduim cursor-pointer rounded border border-[#DBDBDB] px-1 py-0.5 text-14 text-[#767676]"
            onClick={() => setIsModal(true)}
          >
            ?????????
          </span>
        </article>
        <table className="mt-4 w-full">
          <tbody className="relative w-full text-center text-14">
            {biddingList && biddingList.length > 0 ? (
              <tr className="h-10">
                <td className="text-left">??????</td>
                <td>??????</td>
                <td>??????</td>
                <td>??????</td>
              </tr>
            ) : (
              <tr className="my-10">
                <td>?????? ????????? ????????? ?????? ?????? ????????????.</td>
              </tr>
            )}
            {biddingList && biddingList.length > 0 && (
              <>
                <tr className="absolute -left-6 top-10 z-10 h-10 w-[calc(100%+48px)] bg-brand opacity-25" />
                <tr className="h-10">
                  <td className="text-left">{biddingList[0].memberName}</td>
                  <td className="font-bold text-brand">
                    {priceToString(biddingList[0].price)}
                  </td>
                  <td>
                    {biddingList[0].date.split('-').slice(0, 3).join('-')}
                  </td>
                  <td>
                    {biddingList[0].date.split('-').slice(3, 6).join(':')}
                  </td>
                </tr>
              </>
            )}
            {biddingList &&
              biddingList.length >= 1 &&
              biddingList.slice(1).map((bidding, idx: number) => (
                <tr className="h-10" key={idx}>
                  <td className="text-left">{bidding.memberName}</td>
                  <td className="font-bold">{priceToString(bidding.price)}</td>
                  <td>{bidding.date.split('-').slice(0, 3).join('-')}</td>
                  <td>{bidding.date.split('-').slice(3, 6).join(':')}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
      <DivisionBar className="absolute inset-x-0 mx-auto mt-6" />
      <form className="my-[55px]" onSubmit={handleSubmit(onSubmit)}>
        <article>
          <p className="font-meduim text-16">????????????</p>
          <p className="mt-1 text-12 text-[#FF3120]">
            ??????????????? ????????? ?????? ???????????? ????????? ????????? ?????????.
          </p>
        </article>
        <article className="mt-4 flex items-center gap-3">
          <div className="w-full">
            <input
              placeholder="????????? ??????????????????."
              className="placeholder:text-normal h-[42px] w-full  appearance-none rounded-[4px] border-[#D8D8D8] text-[13px] placeholder-[#999999] placeholder:text-14"
              type="text"
              {...register('price', {
                required: false,
                validate: (value) => {
                  if (value) {
                    if (artWork?.topPrice === null) {
                      if (
                        +value.replace(/,/g, '') <
                          leatAskPrice(artWork?.beginPrice!) &&
                        +value.replace(/,/g, '') > artWork.beginPrice
                      )
                        return '?????? ????????? ??????????????????.';
                      else return true;
                    } else if (
                      +value.replace(/,/g, '') <
                      leatAskPrice(artWork?.topPrice!)
                    )
                      return '?????? ????????? ??????????????????.';
                  }
                },
              })}
              onChange={handlePriceChange}
              onBlur={() => setIsBlurred(true)}
            />
          </div>
        </article>
        {errors.price && <ErrorMessage message={errors.price.message} />}

        <Button
          text="??????"
          className="mt-4 w-full"
          disabled={
            remaind < 0 ||
            isMine ||
            moment().isBefore(moment(auction?.startDate, 'YYYY-MM-DD-hh-mm-ss'))
          }
        />
      </form>
      <AskPriceModal
        isModal={isModal}
        message="gg"
        onCloseModal={() => setIsModal(false)}
      />
    </Layout>
  );
}
