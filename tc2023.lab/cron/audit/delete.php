<?php
// 設置場所に合わせて、php/standalone のパスを合わせてください。
require_once dirname(__FILE__) . '/../../php/standalone.php';

set_time_limit(0);
ini_set('memory_limit', '512M');

acmsStandAloneRun(function () {
    try {
        $msg = '削除するデータはありませんでした';
        /*
         * # 実装方法
         * a-blog cmsではデータベースを操作するクラスが用意されてあります。
         *
         *   1. 削除するテーブルの選択
         *   2. 削除する条件を追加
         *   3. データベースへの接続と実行
         *   4. 影響を受けた行数を返す = 削除した件数
        **/
        $sql = SQL::newDelete('audit_log');
        $sql->addWhereOpr('audit_log_datetime', date("Y-m-d H:i:s", strtotime("-3 minute")), '<');
        DB::query($sql->get(dsn()), 'exec');
        $delete_count = DB::affected_rows();
        if ($delete_count > 0) {
            $msg = $delete_count . '件削除しました';
        }

        AcmsLogger::debug($msg);
    } catch (\Exception $e) {
        acmsStdMessage('[Error] ' . $e->getMessage());
        return false;
    }
    return true;
});
