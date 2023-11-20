<?php

class ACMS_POST_Member_Sns_Facebook_Unregister extends ACMS_POST_Member
{
    /**
     * Main
     *
     * @return Field_Validation
     */
    public function post(): Field_Validation
    {
        if (!SUID) {
            return $this->Post;
        }
        $SQL = SQL::newUpdate('user');
        $SQL->addUpdate('user_facebook_id', '');
        $SQL->addWhereOpr('user_id', SUID);
        DB::query($SQL->get(dsn()), 'exec');
        ACMS_RAM::user(SUID, null);

        $session = Session::handle();
        $session->set('oauth-unregister', 'success');
        $session->save();

        AcmsLogger::info('Facebook認証を解除しました');

        return $this->Post;
    }
}
