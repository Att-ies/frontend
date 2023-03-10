import Modal from '@components/auth/Modal';
import Button from '@components/common/Button';
import CheckBox from '@components/common/Checkbox';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import Image from 'next/image';
import tw from 'tailwind-styled-components';
import { useAppDispatch } from '@features/hooks';
import {
  setIsApproveEmailPromotion,
  setIsApproveSMSPromotion,
} from '@features/user/userSlice';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface DefaultProps {
  [key: string]: any;
}

const CheckBoxList = tw.li<DefaultProps>`
pb-[18px] flex justify-between
`;

export default function Join01() {
  const router = useRouter();

  const handleLeftButton = () => {
    router.back();
  };
  const handleRightButton = () => {
    router.push('/auth/login');
  };

  const [checkedTerm, setCheckedTerm] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [termNumber, setTermNumber] = useState<number>(1);
  const onCheckedAll = (checked: boolean): void => {
    if (checked) {
      setCheckedTerm(() => ['term1', 'term2', 'term4', 'term5']);
    } else if (
      (!checked && checkedTerm.includes('term1')) ||
      (!checked && checkedTerm.includes('term2')) ||
      (!checked && checkedTerm.includes('term4')) ||
      (!checked && checkedTerm.includes('term5'))
    ) {
      setCheckedTerm(() => []);
    }
  };

  const onChecked = (checked: boolean, id: string): void => {
    if (checked) {
      setCheckedTerm(() => [...checkedTerm, id]);
    } else if (!checked && checkedTerm.includes(id)) {
      setCheckedTerm(() => checkedTerm.filter((el: string) => el !== id));
    }
  };

  const onCheckedPromotion = (checked: boolean): void => {
    if (checked) {
      setCheckedTerm(() => [...checkedTerm, 'term4', 'term5']);
    } else if (!checked) {
      const values = ['term4', 'term5'];
      setCheckedTerm(() =>
        checkedTerm.filter((el: string) => !values.includes(el)),
      );
    }
  };

  const dispatch = useAppDispatch();

  const { handleSubmit } = useForm();

  const onSubmit = () => {
    if (checkedTerm.includes('term4')) {
      dispatch(setIsApproveSMSPromotion(true));
    }
    if (checkedTerm.includes('term5')) {
      dispatch(setIsApproveEmailPromotion(true));
    }

    if (checkedTerm.includes('term1') && checkedTerm.includes('term2')) {
      router.push('/auth/join02');
    }
  };

  return (
    <Layout>
      <Navigate
        message="????????????"
        handleLeftButton={handleLeftButton}
        handleRightButton={handleRightButton}
      />
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="mt-8 pb-[18px]">
          <CheckBox
            id="selectAll"
            label="????????????"
            isChecked={checkedTerm.length === 4}
            handler={(e) => onCheckedAll(e.target.checked)}
          />
        </div>
        <div>
          <ul>
            <CheckBoxList>
              <CheckBox
                kind="checkbox"
                id="term1"
                label="????????? ???????????? ??????(??????)"
                isChecked={checkedTerm.includes('term1')}
                handler={(e) => onChecked(e.target.checked, e.target.id)}
              />
              <Image
                src="/svg/icons/icon_arrow.svg"
                alt="arrowBtn"
                width={7}
                height={0}
                className="cursor-pointer"
                onClick={() => {
                  setTermNumber(1);
                  setIsModal(true);
                }}
              />
            </CheckBoxList>
            <CheckBoxList>
              <CheckBox
                id="term2"
                label="???????????? ????????? ????????? ??????(??????)"
                isChecked={checkedTerm.includes('term2')}
                handler={(e) => onChecked(e.target.checked, e.target.id)}
              />
              <Image
                src="/svg/icons/icon_arrow.svg"
                alt="arrowBtn"
                width={7}
                height={0}
                className="cursor-pointer"
                onClick={() => {
                  setTermNumber(2);
                  setIsModal(true);
                }}
              />
            </CheckBoxList>
            <CheckBoxList className="pb-0">
              <CheckBox
                id="term3"
                label="????????? ????????? ?????? ?????? ??? ?????? ?????? ??????(??????)"
                isChecked={
                  checkedTerm.includes('term4') && checkedTerm.includes('term5')
                }
                handler={(e) => onCheckedPromotion(e.target.checked)}
              />
              <Image
                src="/svg/icons/icon_arrow.svg"
                alt="arrowBtn"
                width={7}
                height={0}
                className={`${
                  isOpen && 'rotate-90 transform transition'
                } cursor-pointer`}
                onClick={() => {
                  if (!isOpen) {
                    setIsOpen(true);
                  } else {
                    setIsOpen(false);
                  }
                }}
              />
            </CheckBoxList>
            {isOpen && (
              <div>
                <p className="w-full px-7 py-2 text-10 text-[#191919]">
                  ???????????? ????????? ????????? ??????, ????????? ??????, ?????? ?????? ??? ?????????
                  ????????? ???????????????.
                </p>
                <CheckBoxList className="ml-7 pb-2">
                  <CheckBox
                    id="term4"
                    label="SMS ?????? ??????(??????)"
                    isChecked={checkedTerm.includes('term4')}
                    handler={(e) => {
                      console.log(e);
                      onChecked(e.target.checked, e.target.id);
                    }}
                  />
                </CheckBoxList>
                <CheckBoxList className="ml-7">
                  <CheckBox
                    id="term5"
                    label="E-Mail ?????? ??????(??????)"
                    isChecked={checkedTerm.includes('term5')}
                    handler={(e) => onChecked(e.target.checked, e.target.id)}
                  />
                </CheckBoxList>
              </div>
            )}
          </ul>
        </div>
        <Button
          disabled={
            !(checkedTerm.includes('term1') && checkedTerm.includes('term2'))
          }
          text="??????"
          className="absolute inset-x-0 bottom-[34px] m-auto"
        />
      </form>
      <Modal
        term={termNumber}
        isModal={isModal}
        onCloseModal={() => setIsModal(false)}
      />
    </Layout>
  );
}
