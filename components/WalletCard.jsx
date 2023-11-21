const WalletCard = ({ wallet }) => {
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">Wallet</h3>
          </div>
        </div>
      </div>

      <p className="my-4 text-right font-satoshi font-semibold text-lg">
        $ {wallet.value}
      </p>
    </div>
  );
};

export default WalletCard;
