import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../../../core/ui/client/components/Button';
import Dialog from '../../../../core/ui/client/components/Dialog';
import Input from '../../../../core/ui/client/components/Input';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import EditQuestionBodyType, { editQuestionBodySchema } from '../../shared/types/EditQuestionBodyType';
import useEditQuestionMutation from '../mutations/useEditQuestionMutation';
import Question from '../../../../core/mikro-orm/shared/entities/Question';

const EditQuestionDialog = NiceModal.create(({question}: {question: Question}) => {
  const modal = useModal();
  const { register, handleSubmit, formState: { errors } } = useForm<EditQuestionBodyType>({ 
    resolver: yupResolver(editQuestionBodySchema),
    defaultValues: {
      sv: question.content.sv,
      fi: question.content.fi
    }
  });
  const { mutate, isLoading } = useEditQuestionMutation();

  useEffect(() => {
    if(errors.sv || errors.fi) toast.error("Du måste skriva frågan både på svenska och finska");
  }, [errors]);

  const onSubmit = (body: EditQuestionBodyType) => {
    mutate({id: question.id, body}, {
      onSuccess: (res) => {
        if(res.data.error) {
          toast.error("Frågan ändrades inte, prova igen");
          return;
        }
        toast.info('Frågan är nu ändrad');
        modal.resolve(res.data.question);
        modal.hide();
      },
      onError: () => {
        toast.error("Frågan ändrades inte, prova igen");
      }
    })
  }

  const onClose = () => {
    modal.resolve();
    modal.hide();
  }

  return (
    <Dialog
      title="Ändra fråga"
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
        <Button loading={isLoading} onClick={handleSubmit(onSubmit)}>Spara</Button>
      </div>
    </Dialog>
  );
});

export default EditQuestionDialog;
