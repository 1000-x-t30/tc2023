<?php

class ACMS_POST_Blog_Index_ConfigSet extends ACMS_POST_Blog
{
    function post()
    {
        $this->Post->reset(true);
        $this->Post->setMethod('blog', 'isOperable', sessionWithAdministration());
        $this->Post->setMethod('checks', 'required');
        $this->Post->validate(new ACMS_Validator());
        $setid = $this->Post->get('config_set_id') ?: null;
        if (empty($setid)) {
            $setid = null;
        }
        if ($this->Post->isValidAll()) {
            $aryBid = $this->Post->getArray('checks');
            $DB = DB::singleton(dsn());
            $SQL = SQL::newUpdate('blog');
            $SQL->setUpdate('blog_config_set_id', $setid);
            $SQL->addWhereIn('blog_id', $aryBid);
            $DB->query($SQL->get(dsn()), 'exec');

            foreach ($aryBid as $bid) {
                ACMS_RAM::blog($bid, null);
            }
            $sql = SQL::newSelect('config_set');
            $sql->setSelect('config_set_name');
            $sql->addWhereOpr('config_set_id', $setid);
            $name = DB::query($sql->get(dsn()), 'one');
            if (empty($name)) {
                $name = '設定なし';
            }
            AcmsLogger::info('指定されたブログのコンフィグセットを「' . $name . '」に変更', [
                'targetBIDs' => implode(',', $aryBid),
                'configSetID' => $setid,
            ]);
        }
        return $this->Post;
    }
}
