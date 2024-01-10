import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Answer from '../../../../core/mikro-orm/shared/entities/Answer';
import Button from '../../../../core/ui/client/components/Button';
import Dialog from '../../../../core/ui/client/components/Dialog';
import Input from '../../../../core/ui/client/components/Input';
import UpsertAnswerBodyType, { upsertAnswerBodySchema } from '../../shared/types/UpsertAnswerBodyType';
import useDeleteAnswerMutation from '../mutations/useDeleteAnswerMutation';
import useUpsertAnswerMutation from '../mutations/useUpsertAnswerMutation';

const UpsertAnswerDialog = NiceModal.create((props: { questionId: string, answer?: Answer }) => {
  const modal = useModal();
  const { register, handleSubmit, formState: { errors } } = useForm<UpsertAnswerBodyType>({ 
    resolver: yupResolver(upsertAnswerBodySchema),
    defaultValues: !props.answer ? undefined : {
      sv: props.answer.content.sv,
      fi: props.answer.content.fi,
      isCorrect: props.answer.isCorrect
    } 
  });
  const { mutate, isLoading: isSaving } = useUpsertAnswerMutation();
  const { mutate: deleteAnswer, isLoading: isDeleting } = useDeleteAnswerMutation();

  useEffect(() => {
    if(errors.sv || errors.fi || errors.isCorrect) toast.error("Du måste fylla i alla fält");
  }, [errors]);

  const onClose = () => {
    modal.resolve();
    modal.hide();
  }

  const onSubmit = (body: UpsertAnswerBodyType) => {
    mutate({ body, questionId: props.questionId, answerId: props.answer?.id }, {
      onSuccess: (res) => {
        toast.info(!props.answer ? 'Svaret är nu skapad' : 'Svaret är nu ändrat');
        modal.resolve(res.data.question);
        modal.hide();
      },
      onError: () => {
        toast.error(!props.answer ? 'Svaret skapades inte, prova igen' : 'Svaret ändrades inte, prova igen');
      }
    })
  }
  
  const onDelete = () => {
    if(!props.answer) return;
    deleteAnswer(props.answer.id, {
      onSuccess: (res) => {
        toast.info('Svaret är nu raderad');
        console.log(res);
        modal.resolve();
        modal.hide();
      },
      onError: () => {
        toast.error("Svaret raderades inte, prova igen");
      }
    })
  }

  return (
    <Dialog
      title={ props.answer ? 'Ändra svar' : 'Skapa nytt svar' }
      open={modal.visible}
      onClose={onClose}
      afterClose={() => modal.remove()}
      boxClassName="w-full max-w-xl"
      headerActions={ !props.answer ? undefined : (
        <button disabled={isDeleting || isSaving} className='text-red-500 font-medium text-base hover:text-red-400 disabled:text-gray-300'
          onClick={onDelete}
        >Radera</button>
      )}
    >
      <div className='flex flex-col space-y-4'>
        <Input disabled={isSaving || isDeleting} label="Svenska" {...register("sv")} />
        <Input disabled={isSaving || isDeleting} label="Finska" {...register("fi")} />
        <label className="flex flex-col items-start">
          <span className="text-base select-none text-typography-black/70">Rätt</span>
          <input type="checkbox" className='mt-1' {...register("isCorrect")} />
        </label>
      </div>

      <div className='flex justify-between mt-8'>
        <Button disabled={isSaving || isDeleting} variant='primary-outlined' onClick={onClose}>Avbryt</Button>
        <Button loading={isSaving} disabled={isDeleting} onClick={handleSubmit(onSubmit)}>{ props.answer ? 'Spara' : 'Lägg till' }</Button>
      </div>
    </Dialog>
  );
});

export default UpsertAnswerDialog;
