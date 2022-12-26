import Image from 'next/image';
import CheckBox from '@components/common/Checkbox';
import Layout from '@components/common/Layout';
import Button from '@components/common/Button';
import tw from 'tailwind-styled-components';
import arrowBtn from '@public/svg/icons/icon_arrow.svg';
import backBtn from '@public/svg/icons/icon_back.svg';
import closeBtn from '@public/svg/icons/icon_close.svg';
import { useState } from 'react';

interface defaultProps {
  [key: string]: any;
}

const CheckBoxList = tw.li<defaultProps>`
pb-[18px] flex justify-between
`;

export default function Join01() {
  const [checkedTerm, setCheckedTerm] = useState<string[]>([]);

  const onCheckedAll = (checked: boolean): void => {
    if (checked) {
      setCheckedTerm(() => ['term1', 'term2', 'term3', 'term4']);
    } else if (
      (!checked && checkedTerm.includes('term1')) ||
      (!checked && checkedTerm.includes('term2')) ||
      (!checked && checkedTerm.includes('term3')) ||
      (!checked && checkedTerm.includes('term4'))
    ) {
      setCheckedTerm(() => []);
    }
    console.log(checkedTerm);
  };

  const onChecked = (checked: boolean, id: string): void => {
    if (checked) {
      setCheckedTerm(() => [...checkedTerm, id]);
    } else if (!checked && checkedTerm.includes(id)) {
      setCheckedTerm(() => checkedTerm.filter((el: string) => el !== id));
    }
  };

  return (
    <Layout>
      <div className="flex justify-between pb-[44px]">
        <button>
          <Image src={backBtn} alt="back" width={10} height={12}></Image>
        </button>
        <h5 className="text-18 font-bold">회원가입</h5>
        <button>
          <Image src={closeBtn} alt="close" width={24} height={12}></Image>
        </button>
      </div>
      <form autoComplete="off">
        <div className="pb-[18px]">
          <CheckBox
            id="selectAll"
            label="전체동의"
            isChecked={checkedTerm.length === 4 ? true : false}
            handler={(e) => onCheckedAll(e.target.checked)}
          />
        </div>
        <div>
          <ul>
            <CheckBoxList>
              <CheckBox
                kind="checkbox"
                id="term1"
                label="아띠즈 이용약관 동의(필수)"
                isChecked={checkedTerm.includes('term1') ? true : false}
                handler={(e) => onChecked(e.target.checked, e.target.id)}
              />
              <button>
                <Image
                  src={arrowBtn}
                  alt="arrowBtn"
                  width={7}
                  height={14}
                ></Image>
              </button>
            </CheckBoxList>
            <CheckBoxList>
              <CheckBox
                id="term2"
                label="개인정보 수집과 이용에 동의(필수)"
                isChecked={checkedTerm.includes('term2') ? true : false}
                handler={(e) => onChecked(e.target.checked, e.target.id)}
              />
              <button>
                <Image
                  src={arrowBtn}
                  alt="arrowBtn"
                  width={7}
                  height={14}
                ></Image>
              </button>
            </CheckBoxList>
            <CheckBoxList>
              <CheckBox
                id="term3"
                label="위치정보 이용약관에 동의(필수)"
                isChecked={checkedTerm.includes('term3') ? true : false}
                handler={(e) => onChecked(e.target.checked, e.target.id)}
              />
              <button>
                <Image
                  src={arrowBtn}
                  alt="arrowBtn"
                  width={7}
                  height={14}
                ></Image>
              </button>
            </CheckBoxList>
            <CheckBoxList>
              <CheckBox
                id="term4"
                label="아띠즈 이벤트와 프로모션 수신 동의(선택)"
                isChecked={checkedTerm.includes('term4') ? true : false}
                handler={(e) => onChecked(e.target.checked, e.target.id)}
              />
              <button>
                <Image
                  src={arrowBtn}
                  alt="arrowBtn"
                  width={7}
                  height={14}
                ></Image>
              </button>
            </CheckBoxList>
          </ul>
        </div>
      </form>
      <Button text="확인" className="mt-[300px]"></Button>
    </Layout>
  );
}
