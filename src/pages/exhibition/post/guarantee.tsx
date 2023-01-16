import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import { setSignature } from '@features/signature/signatureSlice';
import Image from 'next/image';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import SignatureCanvas from 'react-signature-canvas';

export default function Guarantee() {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();

  return (
    <Layout>
      <Navigate isRightButton={false} message="작품 보증서" />
      <div className="w-full">
        <div className="flex justify-between text-14 mt-6">
          <span className="font-medium">서명을 입력하세요</span>
          <button
            onClick={() => canvasRef.current.clear()}
            className="text-[#767676] flex"
          >
            <Image
              src="/svg/icons/icon_reset.svg"
              alt="reset"
              width={17}
              height={17}
            />
            <span className="ml-1">다시쓰기</span>
          </button>
        </div>
        <div className="mt-2">
          <SignatureCanvas
            ref={canvasRef}
            backgroundColor="#F8F8FA"
            canvasProps={{
              width: 327,
              height: 183,
            }}
            onEnd={() => {
              const dataURL = canvasRef.current.getTrimmedCanvas().toDataURL();
              dispatch(setSignature(dataURL));
            }}
          />
        </div>
        <div className="mt-6">
          <ul className="text-[#767676] ml-3 text-12 list-disc tracking-tight">
            <li>서명 후 아래 이미지로 보증서에 적용됩니다.</li>
          </ul>
        </div>
        <div>
          <Image
            src="/svg/example/guarantee_empty.svg"
            alt="guarantee"
            width={327}
            height={457}
          />
        </div>
      </div>
    </Layout>
  );
}
