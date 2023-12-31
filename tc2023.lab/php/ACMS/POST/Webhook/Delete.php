<?php

class ACMS_POST_Webhook_Delete extends ACMS_POST
{
    function post()
    {
        $id = $this->Get->get('id');
        $webhook = $this->extract('webhook');
        $webhook->reset();

        $sql = SQL::newSelect('webhook');
        $sql->addSelect('webhook_blog_id');
        $sql->addWhereOpr('webhook_id', $id);
        $bid = DB::query($sql->get(dsn()), 'one');
        if (sessionWithAdministration($bid)) {
            $sql = SQL::newSelect('webhook');
            $sql->setSelect('webhook_name');
            $sql->addWhereOpr('webhook_id', $id);
            $name = DB::query($sql->get(dsn()), 'one');

            $this->delete($id);
            $this->addMessage('Webhookを削除しました。');

            AcmsLogger::info('Webhook「' . $name . '」を削除しました', [
                'id' => $id,
            ]);
        } else {
            $this->addError('権限がありません。');
        }
        return $this->Post;
    }

    function delete($id)
    {
        $sql = SQL::newDelete('webhook');
        $sql->addWhereOpr('webhook_id', $id);
        DB::query($sql->get(dsn()), 'exec');

//        $SQL    = SQL::newDelete('log_webhook');
//        $SQL->addWhereOpr('log_webhook_id', $id);
//        DB::query($SQL->get(dsn()), 'exec');
    }
}
