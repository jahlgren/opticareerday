import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../../../core/ui/client/components/Button';
import Dialog from '../../../../core/ui/client/components/Dialog';
import Input from '../../../../core/ui/client/components/Input';
import AddQuestionBodyType, { addQuestionBodySchema } from '../../shared/types/AddQuestionBodyType';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import useAddQuestionMutation from '../mutations/useAddQuestionMutation';

const AddQuestionDialog = NiceModal.create(() => {
  const modal = useModal();
  const { register, handleSubmit, formState: { errors } } = useForm<AddQuestionBodyType>({ resolver: yupResolver(addQuestionBodySchema) });
  const { mutate, isLoading } = useAddQuestionMutation();

  useEffect(() => {
    if(errors.sv || errors.fi) toast.error("Du måste skriva frågan både på svenska och finska");
  }, [errors]);

  const onSubmit = (body: AddQuestionBodyType) => {
    mutate(body, {
      onSuccess: (res) => {
        toast.info('Frågan är nu skapad');
        modal.resolve(res.data.question);
        modal.hide();
      },
      onError: () => {
        toast.error("Frågan skapades inte, prova igen");
      }
    })
  }

  const onClose = () => {
    modal.resolve();
    modal.hide();
  }

  return (
    <Dialog
      title="Skapa ny fråga"
      open={modal.visible}
      onClose={onClose}
      afterClose={() => modal.remove()}
      boxClassName="w-full max-w-xl"
    >
      <div className='flex flex-col space-y-4'>
        <Input label="Svenska" disabled={isLoading} {...register("sv")} />
        <Input label="Finska" disabled={isLoading} {...register("fi")} />
      </div>

      <div className='flex justify-between mt-8'>
        <Button disabled={isLoading} variant='primary-outlined' onClick={onClose}>Avbryt</Button>
        <Button loading={isLoading} onClick={handleSubmit(onSubmit)}>Lägg till</Button>
      </div>
    </Dialog>
  );
});

export default AddQuestionDialog;
